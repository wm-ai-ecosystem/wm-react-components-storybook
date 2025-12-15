import React, { memo, useEffect, useState, useCallback, useMemo, useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import clsx from "clsx";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { WmSpinnerProps, VariableEvents, Subscription } from "./props";

const SpinnerImage = styled(Box)(
  ({
    imagewidth,
    imageheight,
    picture,
  }: {
    imagewidth?: string;
    imageheight?: string;
    picture?: string;
  }) => ({
    width: imagewidth || "20px",
    height: imageheight || "auto",
    backgroundImage: picture ? `url(${picture})` : undefined,
    backgroundSize: imagewidth || "20px",
    backgroundRepeat: "no-repeat",
    display: "inline-block",
  })
);

export const WmSpinner = memo(
  (props: WmSpinnerProps) => {
    const {
      caption = "",
      name,
      type = "icon",
      iconclass = "fa fa-circle-o-notch fa-spin",
      iconsize,
      imagewidth = "20px",
      imageheight,
      animation = "spin",
      styles,
      className,
      id,
      servicevariabletotrack,
      show,
      hint,
      arialabel,
    } = props;

    const DEFAULT_CLS = "app-spinner";
    const servicesRef = useRef<any>(null);
    const isMounted = useRef(true);
    const invokedVariablesRef = useRef(new Set());
    const [trackedVariable, setTrackedVariable] = useState<
      Record<string, { loading: boolean; spinnerMessage: string; spinnerContext: string }>
    >({});

    const parsedShow = useMemo(() => {
      return !!show;
    }, [show]);
    const [isVisible, setIsVisible] = useState(parsedShow);

    const handleVariableEvent = (variableName: string, event: any, variable: any) => {
      // Prevent state updates if component is unmounted
      if (!isMounted.current) return;

      const updateState = (event === VariableEvents.SUCCESS ? variable : undefined) ?? {};
      setTrackedVariable(prev => ({
        ...prev,
        [variableName]: {
          ...(prev[variableName] || {}),
          loading: event === VariableEvents.BEFORE_INVOKE,
          error: event === VariableEvents.ERROR ? variable : null,
          variable: variable,
          spinnerMessage: variable.spinnerMessage,
          spinnerContext: variable.spinnerContext,
        },
      }));
      if (updateState != undefined) {
        messageHandler(variableName);
      }
    };

    const messageHandler = (key: string) => {
      return (
        <Typography component="p" key={key}>
          {trackedVariable[key]?.spinnerMessage}
        </Typography>
      );
    };

    useEffect(() => {
      const newSubscriptions: Subscription[] = [];
      if (servicevariabletotrack && props.listener) {
        servicesRef.current = servicevariabletotrack.split(",");
        const Variables = props.listener?.Variables;
        if (!Variables) return; // Guard if listener or Variables is not present
        servicesRef.current.forEach((name: string) => {
          const variable = Variables[name];
          if (variable) {
            if (typeof variable.invoke === "function" && !invokedVariablesRef.current.has(name)) {
              variable.invoke();
              invokedVariablesRef.current.add(name);
            }
            Object.values(VariableEvents).forEach(event => {
              const handler = () => handleVariableEvent(name, event, variable);
              if (variable && typeof variable.subscribe === "function") {
                variable.subscribe(event, handler);
                newSubscriptions.push({ variable, event, handler });
              }
            });
          }
        });
      }
      return () => {
        newSubscriptions.forEach(({ variable, event, handler }) => {
          if (variable && typeof (variable as any).unsubscribe === "function") {
            (variable as any).unsubscribe(event, handler);
          }
        });
      };
    }, [servicevariabletotrack, props.listener?.Variables]);

    useEffect(() => {
      if (servicevariabletotrack) {
        // If servicevariabletotrack is defined, its loading state dictates visibility
        const services = servicevariabletotrack.split(",");
        const isLoading = services.some(
          serviceName => trackedVariable[serviceName]?.loading === true
        );
        setIsVisible(isLoading);
      } else {
        // If servicevariabletotrack is NOT defined, parsedShow dictates visibility
        setIsVisible(parsedShow);
      }
    }, [trackedVariable, servicevariabletotrack, parsedShow]);

    const renderSpinnerContent = () => {
      if (type === "image" && props.image) {
        return (
          <SpinnerImage
            imagewidth={imagewidth}
            imageheight={imageheight}
            picture={props.image}
            className={clsx(
              "spinner-image animated infinite",
              animation === "spin" ? "fa-spin" : animation
            )}
            aria-hidden="true"
          />
        );
      }

      if (type === "icon") {
        return (
          <i
            className={clsx(
              "spinner-image animated infinite",
              iconclass,
              animation === "spin" ? "fa-spin" : animation
            )}
            aria-hidden="true"
            style={{ fontSize: iconsize }}
          />
        );
      }

      return <CircularProgress />;
    };

    const hasDynamicMessages = servicevariabletotrack && Object.keys(trackedVariable).length > 0;
    const shouldShowStaticCaption = caption && !hasDynamicMessages;

    return (
      <>
        {isVisible && (
          <Box
            title={hint}
            className={clsx(DEFAULT_CLS, className)}
            style={styles}
            id={id}
            aria-label={arialabel}
            role="alert"
            aria-live="polite"
            aria-busy="true"
          >
            <Box className="spinner-message">
              {renderSpinnerContent()}
              {/* Render static caption if conditions are met */}
              {shouldShowStaticCaption && (
                <Typography
                  component="span"
                  className="spinner-text"
                  dangerouslySetInnerHTML={{ __html: caption }}
                />
              )}
              {/* Render dynamic messages if conditions are met */}
              {hasDynamicMessages && (
                <Box className="spinner-messages">
                  {Object.keys(trackedVariable).map(key => messageHandler(key))}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </>
    );
  },
  (prev, current) => {
    const keys: (keyof WmSpinnerProps)[] = [
      "caption",
      "type",
      "servicevariabletotrack",
      "show",
      "iconclass",
      "iconsize",
      "image",
      "imagewidth",
      "imageheight",
      "animation",
    ];
    return keys.every(key => prev[key] === current[key]);
  }
);

WmSpinner.displayName = "WmSpinner";

export default withBaseWrapper(WmSpinner);
