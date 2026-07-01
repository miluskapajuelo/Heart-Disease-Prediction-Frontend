"use client";

import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react";
import * as React from "react";

export interface TooltipProps extends ChakraTooltip.RootProps {
  showArrow?: boolean;
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  content: React.ReactNode;
  contentProps?: ChakraTooltip.ContentProps;
  disabled?: boolean;
}

// Snippet oficial de Chakra v3 (tooltip), accesible y posicionado vía Portal.
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const {
      showArrow = true,
      children,
      portalled = true,
      content,
      contentProps,
      portalRef,
      ...rest
    } = props;

    return (
      <ChakraTooltip.Root openDelay={120} closeDelay={80} {...rest}>
        <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
        <Portal disabled={!portalled} container={portalRef}>
          <ChakraTooltip.Positioner>
            <ChakraTooltip.Content
              ref={ref}
              maxW="260px"
              bg="fg"
              color="white"
              fontSize="xs"
              lineHeight="1.5"
              px="3"
              py="2"
              borderRadius="l1"
              {...contentProps}
            >
              {showArrow && (
                <ChakraTooltip.Arrow>
                  <ChakraTooltip.ArrowTip />
                </ChakraTooltip.Arrow>
              )}
              {content}
            </ChakraTooltip.Content>
          </ChakraTooltip.Positioner>
        </Portal>
      </ChakraTooltip.Root>
    );
  }
);
