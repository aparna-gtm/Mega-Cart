document.addEventListener('DOMContentLoaded', () => {
  const allLikeButton = document.querySelectorAll('.like-btn');

  async function likeButton(productId, btn) {
    try {
      let response = await axios({
        method: 'post',
        url: `/product/${productId}/like`,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        withCredentials: true
      });

      if (btn.children[0].classList.contains('fas')) {
        btn.children[0].classList.remove('fas');
        btn.children[0].classList.add('far');
      } else {
        btn.children[0].classList.remove('far');
        btn.children[0].classList.add('fas');
      }

      console.log(response);
    } catch (e) {
      
      window.location.replace('/login');
     
    }
  }
  for (let btn of allLikeButton) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      let productId = btn.getAttribute('product-id');
      likeButton(productId, btn);
    });
  }


  
});


