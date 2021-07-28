/**
 * @class SuspenseImage
 * @version 3.2.0
 * @author github.com/gokcan
 */

import React, { ReactNode, ImgHTMLAttributes, Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import IntendedError from './IntendedError';

import './anims/anims.css';

export interface ImageProps {
  src: string;
  fallback: ReactNode;
  errorFallback?: (err: string) => ReactNode;
  onLoad?: (image: HTMLImageElement) => any;
  delay?: number;
  fadeIn?: boolean;
  NativeImgProps?: ImgHTMLAttributes<HTMLImageElement>;
}

interface State {
  isLoading: boolean;
  error?: string;
}

const initialState: State = {
  isLoading: false,
  error: '',
};

export class SuspenseImage extends Component<ImageProps, State> {
  static propTypes = {
    src: PropTypes.string.isRequired,
    fallback: PropTypes.element.isRequired,
    errorFallback: PropTypes.func,
    onLoad: PropTypes.func,
    delay: PropTypes.number,
    fadeIn: PropTypes.bool,
    NativeImgProps: PropTypes.object,
  };

  state: State = { ...initialState };

  timeoutId?: NodeJS.Timeout;
  forceReject?: (reason: Error) => void;
  _isMounted = false;

  imgRef = React.createRef<HTMLImageElement>();

  componentDidMount() {
    this._isMounted = true;
    this.start();
  }

  componentDidUpdate(prevProps: ImageProps) {
    const { src } = this.props;
    if (src && src !== prevProps.src) {
      this.safeClearTimeout();
      this.forceReject && this.forceReject(new IntendedError());
      this.setState({ ...initialState }, () => this.start());
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.forceReject = undefined;
    this.safeClearTimeout();
  }

  private start = async () => {
    const { src, fallback, delay } = this.props;
    if (!src || !fallback) {
      const errorMessage = 'src and fallback props must be provided.';
      if (process.env.NODE_ENV !== 'production') {
        console.error(errorMessage);
      }
      this.setState({ error: errorMessage });
      return;
    }
    /*
     * To avoid instant loading 'flash' while downloading images with high-speed internet connection
     * (or downloading smaller images that do not need much loading-time),
     * user may want to give delay before starting to show the loading indicator.
     */
    if (delay && delay > 0) {
      this.timeoutId = setTimeout(() => {
        this.timeoutId = undefined;
        if (!this.state.error && this._isMounted) {
          this.setState({ isLoading: true });
        }
      }, delay);
    } else {
      this.setState({ isLoading: true });
    }

    this.tryLoadImage();
  };

  private loadImage = async (): Promise<void> => {
    const img = this.imgRef.current;

    if (!img) {
      return;
    }

    const { onLoad } = this.props;
    return new Promise((resolve, reject) => {
      this.forceReject = reject;

      const onResolve = async () => {
        if (img.decode !== undefined) {
          try {
            await img.decode();
          } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
              console.error(
                'An Error occurred while trying to decode an image',
                error
              );
            }
          }
        }
        resolve();
        if (onLoad) {
          onLoad(img);
        }
      };

      const onReject = () => {
        reject(
          new Error('An Error occurred while trying to download an image')
        );
      };

      if (img.complete) {
        onResolve();
      } else {
        img.onload = onResolve;
      }
      img.onerror = onReject;
    });
  };

  private tryLoadImage = async (): Promise<void> => {
    try {
      await this.loadImage();
      if (this._isMounted) {
        this.setState({ isLoading: false });
      }
    } catch (error) {
      // If this is an intended(forced) rejection, don't make it visible to user.
      if (!(error instanceof IntendedError) && this._isMounted) {
        this.setState({ error, isLoading: false });
      }
    }
  };

  private safeClearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  render() {
    const { error, isLoading } = this.state;
    const { src, fallback, errorFallback, fadeIn, NativeImgProps } = this.props;
    const { className, ...stripClassname } = NativeImgProps || {};

    if (isLoading) {
      return fallback;
    } else if (error) {
      return errorFallback ? (
        errorFallback(error)
      ) : (
        <span role="button" aria-label="Image failed to load">
          ❌
        </span>
      );
    } else if (src) {
      return (
        <img
          {...stripClassname}
          className={clsx(
            {
              fadein: fadeIn,
            },
            className
          )}
          ref={this.imgRef}
          decoding="async"
          src={src}
        />
      );
    }

    return null;
  }
}

export { SuspenseImage as Image };
