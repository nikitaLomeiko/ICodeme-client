"use client";

import { Button } from "@/shared/ui/kit";
import { oauthProviders } from "../../model/data/oauth.data";
import { useState } from "react";

export const OAuth = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleOauth = (endpoint: string) => {
    setLoading(true);
    window.location.href = endpoint;
  };

  return (
    <div className="grid grid-cols-3 gap-2 mb-3 mt-3">
      {oauthProviders.map((provider) => {
        const Icon = provider.icon;
        return (
          <Button
            key={provider.id}
            variant="ghost"
            onClick={() => handleOauth(provider.url)}
            icon={Icon}
            disabled={isLoading}
            isLoading={isLoading}
            sizeIcon={24}
            disableHoverScale
            className={provider.textColor}
          ></Button>
        );
      })}
    </div>
  );
};
