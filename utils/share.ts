export const shareToFacebook = () => {
  window.open('https://www.facebook.com/sharer/sharer.php?u=https://todaytoon.me/');
};

export const shareToTwitter = (text: string, url?: string) => {
  window.open(`https://www.twitter.com/intent/tweet?&text=${text}&url=${url}`);
};

export const shareToKakao = (title: string, description: string, imgUrl: string, buttonLink: string) => {
  console.log(title)
  console.log(description)
  console.log(imgUrl)
  // @ts-ignore
  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: title,
      description: description,
      imageUrl: imgUrl,
      link: {
        mobileWebUrl: buttonLink,
        webUrl: buttonLink
      }
    },
    // social: {
    //   likeCount: 286,
    //   commentCount: 45,
    //   sharedCount: 845
    // },
    buttons: [
      {
        title: '웹으로 보기',
        link: {
          mobileWebUrl: buttonLink,
          webUrl: buttonLink
        }
      }
    ]
  });
};
