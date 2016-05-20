var myPow = require('../js/script');

describe("pow tests", function() {
  it("Проверка на нечисловые параметры", function() {
    expect(myPow('A', 1)).toContain('Ошибка в параметре');
    expect(myPow(2, 'cds')).toContain('Ошибка в параметре');
    expect(myPow(undefined, Infinity)).toContain('Ошибка в параметре');
    expect(myPow([], {})).toContain('Ошибка в параметре');
  });
  it("Проверка на нулевую степень", function() {
    expect(myPow(-1, 0)).toBe(1);
    expect(myPow(0, 0)).toBe(1);
    expect(myPow(2, 0)).toBe(1);
  });
  it("Проверка на 0 в отрицательной степени", function() {
    expect(myPow(0, -2)).toBe('0 не может быть в отрицательной степени');
  });

  it("Проверка десятичных оснований", function() {
    expect(myPow(0.3, 3)).toBe(0.027);
  });
  it("Проверка десятичных степеней", function() {
    expect(myPow(3, 2.1)).toBe(9);
    expect(myPow(3, 2.5)).toBe(9);
    expect(myPow(3, 2.6)).toBe(9);
  });
  it("Проверка отрицательных оснований", function() {
    expect(myPow(-2, 3)).toBe(-8);
  });
  it("Проверка отрицательных степеней", function() {
    expect(myPow(2, -3)).toBe(0.125);
  });
  it("Проверка проверка вычисления по основанию 0 или 1 (специфичное вычисление)", function() {
    expect(myPow(0, 3)).toBe(0);
    expect(myPow(1, 3)).toBe(1);
  });
});
