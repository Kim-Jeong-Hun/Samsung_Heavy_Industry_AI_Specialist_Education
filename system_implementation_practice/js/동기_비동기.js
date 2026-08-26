// □ 동기 + 블로킹
//  ○ 직접 처리하고 결과가 나올 때까지 기다리는 방식
//  ○ 보통 프로그램을 개발할 때 가장 흔히 사용되는 기본 구조
//  ○ 순차적이고 예측 가능하지만 오래 걸리는 작업이 있으면 프로그램 전체가 멈춤

console.log("A: 직접 커피 만들기 시작");
function makeCoffeeSync() {
    const start = Date.now();
    while (Date.now() - start < 3000) {} // 3초 멈춤
    return " 커피 완성";
}
const coffee = makeCoffeeSync();
console.log("A:", coffee);
console.log("A: 이제 다른 일 시작");

// □ 동기 + 논블로킹
//  ○ 실제로는 거의 찾아보기 힘든 조합
//  ○ 의미있는 동작에서는 대부분 비동기 구조를 사용하므로 실용성 낮음
//  ※ Promise를 사용하면 무조건 비동기이지만 동기처럼 보이도록 구성

console.log("A: 버튼 누름");
function pressButtonLikeSync() {
    Promise.resolve(" 커피 자동 제작 중"); // 결과 무시
    return " 커피가 곧 나옵니다";
}
const msg = pressButtonLikeSync(); // 즉시 반환
console.log("A:", msg);
console.log("A: 바로 자리로 가서 활동 시작");

// □ 비동기 + 블로킹
//  ○ 비동기 작업이지만 결과가 나올 때까지 기다리는 방식
//  ○ 외부 시스템 (서버, DB, 파일 등)과 통신할 때 자주 등장되는 구조
//  ○ async, await 등을 사용해서 블로킹이 될 부분을 제어

console.log("A: 알바생에게 커피 주문");
function orderCoffee() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(" 커피 완성!");
        }, 3000);
    });
}
const waitAtCounter = async () => {
    const coffee = await orderCoffee(); // 기다림
    console.log("A:", coffee);
    console.log("A: 이제 다른 일 시작");
};
waitAtCounter();

// □ 비동기 + 논블로킹
//  ○ 요청 후 다른 작업 수행
//  ○ then, callback, event listener 등으로 완료 시점을 나중에 처리

console.log("A: 커피 주문");
function orderCoffeeAsync() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(" 커피 도착!");
        }, 3000);
    });
}
orderCoffeeAsync().then((coffee) => {
    console.log("A:", coffee);
    console.log("A: 커피를 마신다");
});
console.log("A: 기다리는 동안 책 읽고 유튜브 보기");
