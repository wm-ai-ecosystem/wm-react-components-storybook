import { memo, useState, useEffect, useMemo } from "react";
import { WmWizardStepProps, WizardStepData } from "../props";
import { useWizardContext } from "../WizardContext";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import isEqual from "lodash-es/isEqual";

const WmWizardstep = memo(
  (props: WmWizardStepProps) => {
    const {
      name,
      title = "Step Title",
      subtitle,
      iconclass = "wi wi-person",
      doneiconclass = "wi wi-done",
      enableskip = false,
      disablenext = false,
      disabledone = false,
      disableprevious = false,
      show = true,
      content,
      children,
      dynamicStepIndex,
      isdynamic = false,
      haveForm = false,
      onLoad,
      onNext,
      onPrev,
      onSkip,
      render,
    } = props;
    const context = useWizardContext();
    const [isRegistered, setIsRegistered] = useState(false);
    const stepData: WizardStepData = useMemo(
      () => ({
        name: name || `wizardstep_${Date.now()}`,
        title,
        subtitle,
        iconclass,
        doneiconclass,
        show,
        enableskip,
        enableNext: !disablenext,
        enablePrev: !disableprevious,
        enableDone: !disabledone,
        isDone: false,
        done: false,
        active: false,
        disabled: false,
        isValid: true,
        isInitialized: false,
        content: content,
        dynamicStepIndex,
        isdynamic,
        haveForm,
        onLoad,
        onNext,
        onPrev,
        onSkip,
        render,
        children: children,
      }),
      [
        name,
        title,
        subtitle,
        iconclass,
        doneiconclass,
        show,
        enableskip,
        disablenext,
        disableprevious,
        disabledone,
        content,
        children,
        dynamicStepIndex,
        isdynamic,
        haveForm,
        onLoad,
        onNext,
        onPrev,
        onSkip,
      ]
    );
    useEffect(() => {
      if (!isRegistered) {
        context.registerStep(stepData);
        setIsRegistered(true);
      }
    }, [context, stepData, isdynamic, isRegistered]);
    useEffect(() => {
      if (isRegistered && name) {
        context.updateStep(name, {
          content: content || children,
          enableNext: !disablenext,
          enablePrev: !disableprevious,
          enableDone: !disabledone,
          title,
          enableskip,
          show,
        });
      }
    }, [name, title, enableskip, show, disablenext, disableprevious, disabledone, content]);

    return <></>;
  },
  (prev, next) => {
    const keys: (keyof any)[] = [
      "name",
      "title",
      "subtitle",
      "iconclass",
      "doneiconclass",
      "show",
      "enableskip",
      "disablenext",
      "disableprevious",
      "disabledone",
      "content",
      "dynamicStepIndex",
      "isdynamic",
      "haveForm",
      "onLoad",
      "onNext",
      "onPrev",
      "onSkip",
      "render",
    ];
    return keys.every(key => isEqual(prev[key], next[key]));
  }
);

WmWizardstep.displayName = "WmWizardstep";

export default withBaseWrapper(WmWizardstep);
