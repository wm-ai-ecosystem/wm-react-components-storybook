# Overview

The **Wizard** component is a container used to guide users through a multi-step workflow by dividing complex forms or processes into smaller steps. It provides navigation controls such as Next, Previous, Cancel, and Done, helping users complete tasks in a structured and easy-to-follow manner.

### Markup

```javascript
<wm-wizard type="static" stepstyle="justified" class="number app-wizard" name="wizard" variant="number">
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

- Set next button caption

```javascript
Page.Widgets.wizard.nextbtnlabel = "Continue";
```

- Enable next button

```javascript
Page.Widgets.wizard.enablenext=true;
```

#### Events

- Page redirection on wizard done

```javascript
Page.wizardDone = function (widget, steps) {
 App.Actions.goToPage_Home.invoke();
};
```
#### Methods

- Go to next wizard step

```javascript
Page.Widgets.wizard.next();
```





