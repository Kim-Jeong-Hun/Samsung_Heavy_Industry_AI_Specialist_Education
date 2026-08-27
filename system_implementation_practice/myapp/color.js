import chalk from "chalk";
import path from 'path';
import process from 'process';

console.log(chalk.red('안녕'));

// 디렉토리 이름
console.log(import.meta.dirname);

// 현재 실행 중인 ECMAScript 모듈(ESM) 파일의 절대 경로와 파일명을 반환하는 속성
console.log(import.meta.filename);

// 전달받은 경로 조각들을 조합해 절대 경로(Absolute Path)로 변환해 주는 함수
console.log(path.resolve());

// 현재 작업 디렉토리
console.log(process.cwd());
