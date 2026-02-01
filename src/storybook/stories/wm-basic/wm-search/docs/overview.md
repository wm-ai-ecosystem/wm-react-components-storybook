# Overview

The **Search** component provides advanced search capabilities to quickly find and select items from datasets. It supports autocomplete and standard search modes, allowing users to filter and display results dynamically as they type. The component can be bound to datasets from Databases or Web Services, giving full flexibility and control over search behavior and result handling.

### Markup

```javascript
<wm-search name="search" type="search" dataset="bind:Variables.svGetEmployeesList.dataSet" searchkey="name" displaylabel="name" datafield="All Fields" searchon="typing" searchiconclass="wm-sl-l sl-search"></wm-search>
```

### Use Cases

- Filter tables or lists in real-time as you type.
- Quickly find employees by name, department, or role.
- Look up products or stock items in e-commerce or inventory apps.
- Find files, reports, or media in a portal or knowledge base.