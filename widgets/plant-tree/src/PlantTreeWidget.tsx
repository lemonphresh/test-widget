import React from "react";

const widgetStyles = {
  container: {
    border: "1px solid #ddd",
    padding: "16px",
    borderRadius: "8px",
    maxWidth: "300px",
    textAlign: "center" as const,
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "18px",
    marginBottom: "8px",
  },
  description: {
    fontSize: "14px",
    marginBottom: "12px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

interface PlantTreeWidgetProps {
  buttonText?: string;
  description?: string;
  sku: string;
  title?: string;
}

const PlantTreeWidget: React.FC<PlantTreeWidgetProps> = ({
  buttonText = "Plant a Tree",
  description = "Support their family.",
  sku,
  title = "Plant a Tree",
}): React.ReactElement => {
  const handleCheckout = () => {
    const shopifyUrl = `https://banana.myshopify.com/cart/${sku}:1`;
    window.open(shopifyUrl, "_blank");
  };

  return (
    <div style={widgetStyles.container}>
      <h3 style={widgetStyles.title}>{title}</h3>
      <p style={widgetStyles.description}>{description}</p>
      <button style={widgetStyles.button} onClick={handleCheckout}>
        {buttonText}
      </button>
    </div>
  );
};

if (typeof window !== "undefined") {
  (window as any).PlantTreeWidget = PlantTreeWidget;
}

export default PlantTreeWidget;
