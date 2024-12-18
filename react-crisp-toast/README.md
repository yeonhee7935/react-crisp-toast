# **react-crisp-toast 🍞**
![readme](https://github.com/user-attachments/assets/d5ae8868-b8af-4898-96ca-8ae269ffd33c)


Lightweight toast notification library for React.

<br/>
<br/>
<br/>

## **Live Demo**

Check out the live demo of react-crisp-toast in action: <br/>
<a href="https://react-crisp-toast.vercel.app/">react-crisp-toast</a>

<br/>
<br/>
<br/>

## **Features**

- **Type-based styling**  
  Automatically applies styles based on toast types such as success, error, warning, or info.

- **Dynamic positioning**  
  Display toasts flexibly at the top, bottom, left, right, or center of the screen by specifying `vertical` and `horizontal` props.

- **Toast display duration**  
  Control how long each toast stays visible on the screen.

- **Maximum number of visible toasts**  
  Limit the number of toasts displayed simultaneously, with a queue system for overflow.

- **Swipe-to-dismiss**  
  Allows users to manually dismiss toasts with swipe gestures.

- **Sound notifications**  
  Play sound notifications based on the type of message. Users can customize these sounds.

<br/>
<br/>
<br/>

## **Installation**

Install the library via npm or yarn:

```bash
npm install react-crisp-toast
```

```bash
yarn add react-crisp-toast
```

<br/>
<br/>
<br/>

## **Usage**

To use `react-crisp-toast` in your project, follow these steps.

### 1. Wrap your application with the `ToastProvider`

`ToastProvider` component manages the state of all toasts and <br/>must wrap your application (or a part of it) to provide context.

```tsx
import { ToastProvider } from "react-crisp-toast";

const App = () => (
  <ToastProvider maxToasts={10}>
    <YourApp />
  </ToastProvider>
);

export default App;
```

<br/>

### 2. Use the `useToast` hook to add toasts:

```tsx
import { useToast } from "react-crisp-toast";

const ExampleComponent = () => {
  const { addToast } = useToast();

  const showToast = () => {
    addToast({ message: "This is a toast message!" });
  };

  return <button onClick={showToast}>Show Toast</button>;
};
```

<br/>
<br/>
<br/>

## **Options**

### ToastProvider

| **Prop**       | **Type** | **Description**                                             | **Required** | **Default** |
| -------------- | -------- | ----------------------------------------------------------- | ------------ | ----------- |
| `maxToasts`    | number   | The maximum number of toasts that can be displayed at once. | No           | 5           |
| `soundEnabled` | boolean  | Whether to enable sound for toast notifications.            | No           | false       |

 <br/>

### addToast

These are the parameters passed to the `addToast` function to create a toast notification.

| **Name**              | **Type**                                    | **Description**                                                                                         | **Required** | **Default**                              |
| --------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------ | ---------------------------------------- |
| `message`             | ReactNode                                   | The content/message to be displayed in the toast.                                                       | Yes          | -                                        |
| `type`                | "success" \| "error" \| "warning" \| "info" | The type of the toast.                                                                                  | No           | info                                     |
| `duration`            | number                                      | How long the toast stays visible. Duration in milliseconds.                                             | No           | 3000                                     |
| `position`            | object                                      | The position of the toast on the screen. Accepts an object with `vertical` and `horizontal` properties. | No           | { vertical: "top", horizontal: "right" } |
| `position.vertical`   | "top" \| "bottom"                           | Vertical position of the toast.                                                                         | No           | "top"                                    |
| `position.horizontal` | "left" \| "right" \| "center"               | Horizontal position of the toast.                                                                       | No           | "right"                                  |
| `showCloseButton`     | boolean                                     | Whether to display a close button on the toast.                                                         | No           | false                                    |
| `soundEnabled`        | boolean                                     | Whether to play a sound when the toast appears.                                                         | No           | false                                    |

<br/>
<br/>
<br/>

## **License**

This project is licensed under the MIT License.

<br/>
<br/>
<br/>

## **Sound Effect**

The sound effects used in this project are sourced from the [Interface Sounds collection on Pixabay](https://pixabay.com/collections/interface-sounds-23710620/). These sounds are in the public domain and are free to use under the Pixabay Content License.
