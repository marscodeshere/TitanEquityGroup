import React from "react";
import Button from "react-bootstrap/Button";

export default function Portfolio() {
    return (
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Your Portfolio.</h1>
            <p className="text-gray-600 mb-4">Minimalistic, fast, and powerful stock trading.</p>
            <Button className="px-6 py-2 text-lg">Get Started</Button>
        </div>
    );
  }