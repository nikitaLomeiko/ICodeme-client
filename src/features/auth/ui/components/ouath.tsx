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
            variant="ghost"
            onClick={() => null}
            disabled={false}
            icon={Icon}
            size="sm"
            sizeIcon={35}
            className={`
              ${provider.textColor}
            `}
          ></Button>
        );
      })}
    </div>
  );
};
