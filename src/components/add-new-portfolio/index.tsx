"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { PortfolioForm } from "../forms/portfolio-form";

export function AddNewPortfolio() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button onClick={handleClick}>Add Portfolio</Button>
      <Modal isOpen={isOpen} onClose={handleClick}>
        <h2 className="text-lg font-semibold mb-4">Add New Portfolio</h2>
        <PortfolioForm onClose={handleClick} />
      </Modal>
    </>
  );
}
