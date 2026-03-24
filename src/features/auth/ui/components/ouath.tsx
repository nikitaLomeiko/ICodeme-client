"use client";

import { Button } from "@/shared/ui/kit";
import { oauthProviders } from "../../model/data/oauth.data";

export const OAuth = () => {
  return (
    <div className="grid grid-cols-3 gap-2 mb-3 mt-3">
      {oauthProviders.map((provider) => {
        const Icon = provider.icon;
        return (
          <Button
            key={provider.id}
            variant="outline"
            size="sm"
            onClick={() => null}
            disabled={false}
            icon={Icon}
            className={`
              ${provider.color} 
              ${provider.textColor} 
              border ${provider.borderColor}
              ${provider.iconColor}
            `}
          >
            <span className="sr-only">{provider.name}</span>
          </Button>
        );
      })}
    </div>
  );
};
