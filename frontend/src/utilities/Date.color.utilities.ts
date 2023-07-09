import { useColorModeValue, useColorMode } from "@chakra-ui/react";

export const getColorModeDate = () => {
  const { colorMode } = useColorMode();

  const getModeColor = (lightValue: string, darkValue: string) => {
    return colorMode === "light" ? lightValue : darkValue;
  };

  const colorScheme = getModeColor("white", "black");
  const bgColor = getModeColor("white", "black");
  const textColor = getModeColor("white", "black");

  return {
    dateNavBtnProps: {
      colorScheme: colorScheme,
      variant: "outline",
    },
    dayOfMonthBtnProps: {
      defaultBtnProps: {
        bg: bgColor,
        color: textColor,
        borderColor: "red.300",
        _hover: {
          bg: "blue.400",
        },
      },
      isInRangeBtnProps: {
        color: "yellow",
      },
      selectedBtnProps: {
        background: "blue.200",
        color: "blue",
      },
      todayBtnProps: {
        background: "teal.400",
      },
    },
    inputProps: {
      size: "sm",
    },
    popoverCompProps: {
      popoverContentProps: {
        background: "gray.700",
        color: "white",
      },
    },
    weekdayLabelProps: {
      fontWeight: "normal",
    },
    dateHeadingProps: {
      fontWeight: "semibold",
    },
  };
};
