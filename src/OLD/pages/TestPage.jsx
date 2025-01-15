import { useState } from "react";
import ComponentTester from "@src/components/Tester/ComponentTester";
import MediaCard from "@src/components/Common/MediaCard/MediaCard"; // Example component

const TestPage = () => {
  const [componentToTest, setComponentToTest] = useState("MediaCard");

  // A map of components you want to test
  const components = {
    MediaCard: {
      component: MediaCard,
      props: {
        title: "Inception",
        image: "https://via.placeholder.com/300",
        description: "A mind-bending thriller directed by Christopher Nolan.",
      },
    },
    // Add more components here
    // Button: { component: Button, props: { text: "Click Me", onClick: () => alert("Clicked!") } }
  };

  const currentComponent = components[componentToTest];

  return (
    <div>
      <h1>Component Tester</h1>

      {/* Dropdown to switch between components */}
      <select
        value={componentToTest}
        onChange={(e) => setComponentToTest(e.target.value)}
        style={{ marginBottom: "20px" }}
      >
        {Object.keys(components).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      {/* Render the selected component */}
      {currentComponent && (
        <ComponentTester
          component={currentComponent.component}
          props={currentComponent.props}
        />
      )}
    </div>
  );
};

export default TestPage;
