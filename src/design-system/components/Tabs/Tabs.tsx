"use client";

import { cn } from "@/lib/utils";
import { Tab as TabType } from "@/modules/home/types";
import { useState } from "react";
import { Button } from "../ui/button";

type TabProps = {
  tab: TabType;
  onClick: () => void;
  disabled?: boolean;
};

type TabsProps = {
  tabs: TabType[];
  onTabChange?: (tab: TabType) => void;
  className?: string;
  disabled?: boolean;
};

export function Tabs({ tabs, onTabChange, className, disabled }: TabsProps) {
  const [activeTab, setActiveTab] = useState<string | undefined>(tabs[0].value);

  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-muted w-fit p-1 rounded-lg",
        className
      )}>
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          tab={{
            ...tab,
            active: activeTab === tab.value,
          }}
          disabled={disabled}
          onClick={() => {
            setActiveTab(tab.value);
            onTabChange?.(tab);
          }}
        />
      ))}
    </div>
  );
}

function Tab({ tab, onClick, disabled }: TabProps) {
  const { title, active } = tab;

  return (
    <Button
      variant="ghost"
      disabled={disabled}
      className={cn(
        "capitalize font-semibold hover:bg-background dark:hover:bg-background",
        active ? "bg-background" : ""
      )}
      onClick={onClick}>
      {title}
    </Button>
  );
}
