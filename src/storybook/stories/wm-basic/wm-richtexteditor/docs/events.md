# Callback Events

<details open>
  <summary>Basic Events</summary>
    <div>
        | Event | Description |
        | --- | --- |
        | `onChange` | This event handler is called each time your component's value changes. |
    </div>
</details>

<details>
  <summary>Callback Events</summary>
    <div>
        | Event | Description |
        | --- | --- |
        | `onBeforerender` | This event handler is called on before update of the progress. |
    </div>
</details>

### Use Cases

- Triggered on change whenever the value of the richtext editor is updated.

```javascript
    Page.richtexteditorChange = function ($event, widget, newVal, oldVal) {
      console.log("Old Value:", oldVal);
      console.log("New Value:", newVal);
};
```

- Triggered before the richtext editor is rendered on the page.

```javascript
    Page.richtexteditorBeforerender = function ($event, widget) {
    console.log("Rich Text Editor is about to render.");
};
```