"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { WmButton } from "@/components/form/button";
import { WmLabel } from "@/components/basic/label";
import { WmIcon } from "@/components/basic/icon";
import { WmPicture } from "@/components/basic/picture";
import { WmContainer } from "@/components/container";
import { store } from "@/store";

interface ErrorFallbackProps {
  error?: {
    message?: string;
    stack?: string;
  };
  errorInfo?: {
    componentStack?: string;
  };
  title?: string;
  subtitle?: string;
  imageSource?: string;
  onError?: (error: any, errorInfo: any) => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  title = "Something went wrong.",
  subtitle = "Please try again.",
  imageSource = "/error-fallback.svg",
}) => {
  const router = useRouter();
  const homePage = store.getState()?.info?.appConfig?.appProperties?.homePage;
  const handleGoHome = () => {
    if (homePage) {
      router.push(homePage);
    } else {
      window.location.href = window.location.origin;
    }
  };

  const handleGoBack = () => {
    const hasHistory = typeof window !== "undefined" && window.history.length > 1;
    if (hasHistory) {
      router.back();
    } else {
      window.location.href = window.location.origin;
    }
  };

  return (
    <div className="error-container">
      <div className="error-info-container">
        <WmContainer name="error-container" listener={{}} className="error-image-container">
          <WmPicture
            picturesource={imageSource || "/error-fallback.svg"}
            resizemode="contain"
            name="error-picture"
            listener={{}}
            className="error-fallback-image"
            width="120px"
            height="120px"
            alttext="Error illustration"
          />
        </WmContainer>

        <WmLabel
          caption={title || "Something went wrong."}
          className="error-fallback-title"
          type="h2"
          name="error-title"
          listener={{}}
        />

        <WmLabel
          caption={subtitle || "Please try again."}
          className="error-fallback-subtitle"
          name="error-subtitle"
          listener={{}}
        />

        {error && (
          <div className="error-card">
            <div className="error-card-row">
              <WmIcon
                id="error-icon"
                iconclass="wi wi-error"
                className="error-fallback-erroricon"
                iconsize="20px"
                name="error-icon"
                listener={{}}
              />
              <WmLabel
                caption="Error"
                className="error-fallback-error-label"
                name="error-label"
                listener={{}}
              />
            </div>
            <WmLabel
              caption={error?.message || "An unexpected error occurred"}
              className="error-fallback-error-message"
              name="error-message"
              listener={{}}
            />
          </div>
        )}
      </div>

      <div className="error-button-container">
        <WmButton
          caption="Go to Home"
          onClick={handleGoHome}
          className="btn btn-primary"
          name="go-to-home"
          listener={{}}
        />

        <WmButton
          caption="Go Back"
          onClick={handleGoBack}
          className="btn-secondary"
          name="go-back"
          listener={{}}
        />
      </div>
    </div>
  );
};

export default ErrorFallback;
