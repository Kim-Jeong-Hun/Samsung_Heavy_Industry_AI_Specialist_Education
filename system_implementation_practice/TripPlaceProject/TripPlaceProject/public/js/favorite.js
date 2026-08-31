// 즐겨찾기(찜하기) 기능
// 여행지 id를 브라우저 저장소에 배열 형태로 저장/삭제하는 기능

function getFavorites() {
  // 즐겨찾기가 브라우저를 닫으면(탭을 끄면) 사라짐
  // 정상 동작: 브라우저를 껐다 켜도 즐겨찾기 목록이 유지되어야 함
  // 힌트: 두 가지 저장소 중 하나를 잘못 사용하고 있음. 브라우저 개발자도구 Application 탭에서
  //       localStorage와 sessionStorage의 차이를 비교해볼 것
  const saved = sessionStorage.getItem('favorites');
  return saved ? JSON.parse(saved) : [];
}

function toggleFavorite(id) {
  let favorites = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter(function (favId) { return favId !== id; });
  } else {
    favorites.push(id);
  }

  sessionStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoriteButton(id);
}

function updateFavoriteButton(id) {
  const btn = document.querySelector('.favorite-btn[data-id="' + id + '"]');
  if (!btn) return;

  const favorites = getFavorites();
  if (favorites.includes(id)) {
    btn.classList.add('active');
    btn.textContent = '♥ 즐겨찾기 완료';
  } else {
    btn.classList.remove('active');
    btn.textContent = '♡ 즐겨찾기 추가';
  }
}

// 페이지 로드 시 화면에 있는 즐겨찾기 버튼들의 상태를 저장소 값과 맞춤
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.favorite-btn').forEach(function (btn) {
    updateFavoriteButton(Number(btn.dataset.id));
  });
});
