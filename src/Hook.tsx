import React, { useEffect, useReducer, ImgHTMLAttributes, ReactElement } from 'react'
import clsx from 'clsx'

import './anims/anims.css'

export interface ImageProps {
  src: string
  fallback: ReactElement
  errorFallback?: (err: string) => ReactElement
  onLoad?: (image: HTMLImageElement) => any
  fadeIn?: boolean
  NativeImgProps?: ImgHTMLAttributes<HTMLImageElement>
}

interface ImageState {
  isLoading: boolean
  internalSrc: string
  error: string
}

type ImageLoadAction =
  | { type: 'fetching' }
  | { type: 'success'; payload: { src: string } }
  | { type: 'error'; error: Error }
  | { type: 'reset' }

const initialState: ImageState = {
  isLoading: false,
  internalSrc: '',
  error: ''
}

const imageLoadReducer = (state: ImageState, action: ImageLoadAction) => {
  switch (action.type) {
    case 'fetching': {
      return { ...state, isLoading: true, error: '' }
    }
    case 'success': {
      return { ...state, isLoading: false, error: '', internalSrc: action.payload.src }
    }
    case 'error': {
      return { ...state, isLoading: false, error: action.error.message }
    }
    case 'reset': {
      return { ...state, isLoading: false, error: '', internalSrc: '' }
    }
    default: {
      return state
    }
  }
}

export const SuspenseImage: React.FC<ImageProps> = ({ src, fallback, fadeIn, onLoad, errorFallback, NativeImgProps }) => {
  const [{ isLoading, error, internalSrc }, dispatch] = useReducer(imageLoadReducer, initialState)
  const { className, ...stripClassname } = NativeImgProps || {}

  const loadImage = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const onResolve = async () => {
        if (img.decode !== undefined) {
          try {
            await img.decode()
          } catch (e) {
            reject(new Error('An Error occurred while trying to decode an image'))
          }
        }
        resolve(img.src)
        if (onLoad) {
          onLoad(img)
        }
      }

      const onReject = () => {
        reject(new Error('An Error occurred while trying to download an image'))
      }

      img.onload = onResolve
      img.onerror = onReject
      img.src = src
    })
  }

  const handleLoadImage = async () => {
    dispatch({ type: 'fetching' })

    try {
      const resolvedSrc = await loadImage()
      dispatch({ type: 'success', payload: { src: resolvedSrc } })
    } catch (error) {
      dispatch({ type: 'error', error })
    }
  }

  useEffect(() => {
    if (src && fallback) {
      dispatch({ type: 'reset' })
      handleLoadImage()
    } else {
      const errorMessage = 'src and fallback props must be provided.'
      if (process.env.NODE_ENV !== 'production') {
        console.error(errorMessage)
      }
      dispatch({ type: 'error', error: new Error(errorMessage) })
    }
  }, [src, fallback])

  if (isLoading) {
    return fallback
  }

  if (error) {
    return errorFallback ? (
      errorFallback(error)
    ) : (
      <span role='button' aria-label='Image failed to load'>
        ❌
      </span>
    )
  }

  if (internalSrc) {
    return (
      <img
        src={internalSrc}
        className={clsx(
          {
            fadein: fadeIn
          },
          className
        )}
        {...stripClassname}
      />
    )
  }

  return null
}
