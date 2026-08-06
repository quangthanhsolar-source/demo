export const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN").format(Math.round(n || 0)) + " đ";

export const formatNumberInput = (n: number | string | null | undefined) =>
  n === "" || n === null || n === undefined
    ? ""
    : new Intl.NumberFormat("vi-VN").format(Number(n));

export const parseNumberInput = (s: string) => {
  const digits = String(s).replace(/[^\d]/g, "");
  return digits === "" ? 0 : parseInt(digits, 10);
};
