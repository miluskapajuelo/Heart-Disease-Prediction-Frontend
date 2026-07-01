"use client";

import { Box, CloseButton, Dialog, Image, Portal, Text, VStack } from "@chakra-ui/react";

/**
 * Figura con:
 *  - zoom suave al hover (CSS transform scale)
 *  - popup / lightbox al hacer click (Chakra Dialog)
 * Accesible: el disparador es un botón con aria-label; el Dialog atrapa foco
 * y cierra con Esc o clic fuera (comportamiento por defecto de Chakra).
 */
export function ZoomableFigure({ src, cap }: { src: string; cap: string }) {
  return (
    <VStack
      align="stretch"
      gap={0}
      bg="bg.surface"
      borderRadius="l2"
      border="1px solid"
      borderColor="blackAlpha.100"
      boxShadow="card"
      overflow="hidden"
    >
      <Dialog.Root placement="center" motionPreset="scale" scrollBehavior="inside">
        <Dialog.Trigger asChild>
          <Box
            as="button"
            aria-label={`Enlarge figure: ${cap}`}
            p={3}
            bg="white"
            cursor="zoom-in"
            w="full"
          >
            {/* Contenedor de altura fija: la imagen LLENA el área y recorta lo que sobra */}
            <Box h="200px" overflow="hidden" borderRadius="l1">
              <Image
                src={src}
                alt={cap}
                w="full"
                h="full"
                objectFit="cover"
                objectPosition="center"
                transition="transform 0.35s cubic-bezier(0.22,1,0.36,1)"
                _hover={{ transform: "scale(1.05)" }}
              />
            </Box>
          </Box>
        </Dialog.Trigger>

        <Portal>
          <Dialog.Backdrop bg="blackAlpha.700" backdropFilter="blur(3px)" />
          <Dialog.Positioner p={{ base: 4, md: 8 }}>
            <Dialog.Content bg="transparent" boxShadow="none" maxW="min(1100px, 94vw)" w="full">
              <Box position="relative" bg="white" borderRadius="l2" p={3} boxShadow="cardHover">
                <Image src={src} alt={cap} w="full" borderRadius="l1" />
                <Text fontSize="sm" color="fg.muted" px={2} py={3}>
                  {cap}
                </Text>
                <Dialog.CloseTrigger asChild>
                  <CloseButton position="absolute" top={2} right={2} size="sm" bg="bg.surface" boxShadow="card" />
                </Dialog.CloseTrigger>
              </Box>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      <Text fontSize="xs" color="fg.muted" lineHeight="1.5" p={4} borderTop="1px solid" borderColor="blackAlpha.100">
        {cap}
      </Text>
    </VStack>
  );
}
