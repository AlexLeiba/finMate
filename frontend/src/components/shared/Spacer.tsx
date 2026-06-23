import { cva, type VariantProps } from "class-variance-authority";

const variants = cva("h-2", {
  variants: {
    size: {
      2: "h-2",
      4: "h-4",
      8: "h-8",
      12: "h-12",
      16: "h-16",
      20: "h-20",
      24: "h-24",
      28: "h-28",
      32: "h-32",
      36: "h-36",
      40: "h-40",
      44: "h-44",
      48: "h-48",
      52: "h-52",
      56: "h-56",
      60: "h-60",
      64: "h-64",
      72: "h-72",
      80: "h-80",
      96: "h-96",
    },
  },
});

type SpacerProps = {
  size: VariantProps<typeof variants>["size"];
};
export function Spacer({ size }: SpacerProps) {
  return <div className={variants({ size })} />;
}
