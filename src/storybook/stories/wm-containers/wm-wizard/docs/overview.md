# Overview

The Wizard component is a container used to guide users through a multi-step workflow by dividing complex forms or processes into smaller steps. It provides navigation controls such as Next, Previous, Cancel, and Done, helping users complete tasks in a structured and easy-to-follow manner.

Wizards are commonly used in onboarding flows, registration forms, checkout processes, and setup configurations.

### Markup

```javascript
<wm-wizard type="static" stepstyle="justified" class="number app-wizard" name="wizard1" variant="number">

  <wm-wizardstep name="wizardstep1"></wm-wizardstep>
  <wm-wizardstep name="wizardstep2"></wm-wizardstep>
  <wm-wizardstep name="wizardstep3"></wm-wizardstep>

  <wm-wizardaction name="wizardaction1">
    <wm-anchor class="app-wizard-skip" caption="Skip »" show="bind:skippable()" on-click="skip()" name="anchor1"></wm-anchor>
    <wm-container class="app-wizard-actions-right app-container-default" name="container4" variant="default">

      <wm-button class="btn-filled btn-default" type="button" caption="bind:cancelbtnlabel()" show="bind:cancelable()" on-click="cancel()" name="button1" variant="filled:default"></wm-button>
      <wm-button class="btn-filled btn-default" type="button" iconclass="wi wi-chevron-left" caption="bind:previousbtnlabel()" show="bind:hasPreviousStep()" on-click="previous()" disabled="bind:disablePrevious()" name="button2" variant="filled:default"></wm-button>
      <wm-button class="btn-filled btn-default" type="button" iconclass="wi wi-chevron-right" iconposition="right" caption="bind:nextbtnlabel()" show="bind:hasNextStep()" on-click="next()" disabled="bind:disableNext()" name="button3" variant="filled:default"></wm-button>
      <wm-button class="btn-filled btn-default" type="button" iconclass="wi wi-check" caption="bind:donebtnlabel()" show="bind:hasNoNextStep()" on-click="done()" disabled="bind:disableDone()" name="button4" variant="filled:default"></wm-button>
    </wm-container>

  </wm-wizardaction>
</wm-wizard>


    
```

### Examples

#### Properties

- Update navigation button labels

```javascript
Page.Widgets.employeeWizard.nextbtnlabel = "Continue";
```

- Start onboarding from Personal Details step

```javascript
Page.Widgets.employeeWizard.defaultstepindex = 0;
```

#### Events

- On Load (invoke service variable)

```javascript
Page.step2Load = function (step, stepIndex) {
  Page.Variables.svGetCustomerPreferences.invoke();
};
```

- On Next (Validate the form when the Next button in the Wizard is clicked)

```javascript
Page.step1Next = function (widget, currentStep, stepIndex) {
  var form = Page.Widgets.registrationForm;
  if (form.isValid) {
    return true;
  }
  app.notify.error("Please complete required fields");
  return false;
};
```

- On Done (Triggered when the Wizard completes all step)

```javascript
Page.wizardEmployeeDone = function (currentStep, steps) {
  // Submit registration data
  Page.Variables.svRegisterCustomer.invoke();
  // Show success message
  app.notify.success("Customer registration completed successfully");
};
```
