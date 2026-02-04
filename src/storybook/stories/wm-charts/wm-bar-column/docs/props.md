# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `title` | string | "Bar Chart / Column Chart" | Set the title of the component. |
        | `subheading` | string | - | Set the sub heading of the component. |
        | `name` | string | - | A unique identifier for the bar or column chart component. Special characters and spaces are not allowed. |
    </div>
</details>

<details>
  <summary>Advanced Settings</summary>
    <div>
        <details open>
          <summary>Chart</summary>
            <div>
              | Property | Type | Default | Description |
              | --- | --- | --- | --- |
              | **Datapoint Color** |  |  |  |
              | `theme` | string | "Terrestrial" | This property controls the theme of bar/column chart and can be chosen from a list of options. |
              | `customcolors` | string | - | This property can be used to change the set of colors that comes predefined with the selected theme. The values for this property can be comma separated values, eg. red, green, blue. Can also bound to a static variable containing the color names or the color hash codes. |
              | **Message** |  |  |  |
              | `nodatamessage` | string | - | This property will be displayed when there is no data to display. |
              | `loadingdatamsg` | string | - | This property will be displayed when waiting for data to load. |
              | **Layout** |  |  |  |
              | `offsetbottom` | number | 55 | This property controls the bottom offset of the chart. |
              | `offsetleft` | number | 75 | This property controls the left offset of the chart. |
              | `offsetright` | number | 25 | This property controls the right offset of the chart. |
              | `offsettop` | number | 25 | This property controls the top offset of the chart. |
              | **Legend** |  |  |  |
              | `showlegend` | string | "top" | This property controls whether to show the legend or it's position. |
              | `legendtype` | string | "furious" | This property allows to display the type of legend. |
              | **Behavior** |  |  |  |
              | `tooltips` | boolean | true | This property controls whether to show the tooltip on hover. |
              | **Data Rendering** |  |  |  |
              | `viewtype` | string | "Stacked" | This (Data Arrangement) property controls whether to show bar or column in stacked or grouped. |
            </div>
        </details>
        <details>
          <summary>X-Axis</summary>
            <div>
              | Property | Type | Default | Description |
              | --- | --- | --- | --- |
              | `showxaxis` | boolean | true | This property controls whether to show x-axis or not. |
              | `xaxislabel` | string | - | Caption of x-axis on the chart. |
              | `xunits` | string | - | Specifies the units of x-axis. |
              | `xaxislabeldistance` | number | - | This (Caption Distance) property controls the distance between the x-axis and it's label. (**Note**: This option is available only for the **Bar** Chart). |
              | `xdomain` | string | "Default" | This (Origin) property by default axis scale starts from 0. Choosing 'Min' option makes the scale starting value to minimun of all values. (**Note**: This option is available only for the **Column** Chart).|
              | `showvalues` | boolean | true | This property controls showing of values on the chart. (**Note**: This option is available only for the **Bar** Chart). |
              | `staggerlabels` | boolean | true | This property controls whether to stagger the labels which distributes labels into multiple lines. |
              | `reducexticks` | boolean | true | This (Reduce X Datapoints) property controls whether to reduce the xticks or not. (**Note**: This option is available only for the **Column** Chart). |
              | `barspacing` | string | - | This property controls spacing between the bars or columns and value ranges from 0.1 to 0.9. |
            </div>
        </details>
        <details>
          <summary>Y-Axis</summary>
            <div>
              | Property | Type | Default | Description |
              | --- | --- | --- | --- |
              | `showyaxis` | boolean | true | This property controls whether to show y-axis or not. |
              | `yaxislabel` | string | - | Caption of y-axis on the chart. |
              | `yunits` | string | - | Specifies the units of y-axis. |
              | `yaxislabeldistance` | number | - | This (Caption Distance) property controls the distance between the y-axis and it's label. (**Note**: This option is available only for the **Column** Chart). |
              | `ydomain` | string | "Default" | This (Origin) property by default axis scale starts from 0. Choosing 'Min' option makes the scale starting value to minimun of all values. (**Note**: This option is available only for the **Column** Chart).|
              | **Data Format** |  |  |  |
              | `ynumberformat` | string | - | This (Display Format )shows the options to format the number type in y-axis. |
            </div>
        </details>
    </div>
</details>

<details>
  <summary>Layout</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `width` | string | - | The width of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
        | `height` | string | "250px" | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
    </div>
</details>

<details>
  <summary>Dataset</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `dataset` | array | - | Data can come from various sources like database, web service or another component and can be accessed through binding to Live or Service Variables. |
        | `groupby` | string | - | This property allows for grouping the list of rows in the variable bound to a dataset by selecting one of the field names from the drop-down list. |
        | `aggregation` | string | "none" | Shows the options to aggregate the data in the chart. |
        | `aggregationcolumns` | string | "" | Shows the options to aggregate the data in the chart. |
        | `orderby` | string[] | "" | This allows for multiple selection for ordering the display of rows based on fields in asc or desc order - up arrow for asc and down arrow for desc. |
    </div>
</details>

<details>
  <summary>X-Axis</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `xaxisdatakey` | string | - | X‑axis represents the category or label for each bar/column. |
    </div>
</details>

<details>
  <summary>Y-Axis</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `yaxisdatakey` | string[] | - | Y‑axis represents the numeric value for each bar/column. |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
        | `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
    </div>
</details>

<details>
  <summary>Graphics</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `iconclass` | string | - | Defines the class of the icon that is applied to the bar/column chart component. |
    </div>
</details>