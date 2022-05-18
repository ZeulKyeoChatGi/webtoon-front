import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';

const Footer = () => {
  const router = useRouter();

  const [isShareModal, setIsShareModal] = useState(false);
  const outSection = useRef(null);

  const handleClickShare = () => {
    setIsShareModal(true);
  };

  const closeModal = () => {
    setIsShareModal(false);
  };

  const newTabBuyMeACoffe = () => {
    window.open('https://www.buymeacoffee.com/todaytoon', '_blank');
  };

  const handleClickAboutUs = () => {
    window.open('https://www.notion.so/1jisoo/4dd92cc2681444199c7fe7a9497e248c', '_blank');
  };

  const handleShareFacebook = () => {
    window.open('https://www.facebook.com/sharer/sharer.php?u=https://todaytoon.me/');
  };

  const handleShareTwitter = () => {
    window.open('https://www.twitter.com/intent/tweet?&url=https://todaytoon.me/');
  };

  const handleClickServay = () => {
    window.open('https://docs.google.com/forms/d/1pSFMT028641RKxr1ougTn3gzqb_pxWr8KyOxjQVt1oY/edit?usp=sharing', '_blank');
  };

  const handleShareKakao = () => {
    // @ts-ignore
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '오늘의웹툰 제목제목',
        description: '오늘의 웹툰 내용 나타나는 부분',
        imageUrl: 'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
        link: {
          mobileWebUrl: 'https://todaytoon.me',
          webUrl: 'https://todaytoon.me'
        }
      },
      social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: 'https://todaytoon.me',
            webUrl: 'https://todaytoon.me'
          }
        }
      ]
    });
  };

  const handleShareUrl = () => {
    const url = 'https://todaytoon.me';

    const t = document.createElement('textarea');
    document.body.appendChild(t);
    t.value = url;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);

    toast('클립보드에 복사되었습니다.', {
      position: 'bottom-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  return (
    <>
      <div className="footer-wrapper">
        <div className="section_logo">
          <p className="logo">오늘의 웹툰</p>
          <p className="team">by.즐겨찾기팀</p>
        </div>

        <div className="section_content">
          <div className="item_layout">
            <div className="item pointer" onClick={handleClickShare}>
              <p>서비스 친구에게 소개하기</p>
              <img src="/icons/ic_thumbs_up.svg" style={{ width: '20px', marginLeft: '2px' }} />
            </div>

            <div className="ml-10"></div>

            <div className="item pointer" onClick={handleClickAboutUs}>
              <p>About Us</p>
              <img src="/icons/ic_raising_hands.svg" style={{ width: '20px', marginLeft: '2px' }} />
            </div>
          </div>

          <div className="item_layout" style={{ marginTop: '8px' }}>
            <div className="item pointer" onClick={handleClickServay}>
              <p>더 나은 서비스를 위해 피드백 남기기</p>
              <img src="/icons/ic_memo.svg" style={{ width: '20px', marginLeft: '2px' }} />
            </div>

            <div className="ml-10"></div>

            <div className="item pointer" onClick={newTabBuyMeACoffe}>
              <p>후원하기</p>
              <img src="/icons/ic_love_letter.svg" style={{ width: '20px', marginLeft: '2px' }} />
            </div>
          </div>
        </div>

        {isShareModal && (
          <div
            className="share-modal-wrapper"
            ref={outSection}
            onClick={(e) => {
              if (outSection.current === e.target) {
                closeModal();
              }
            }}
          >
            <div className="modal_content">
              <div className="title">
                <p>서비스 친구에게 소개하기</p>

                <img onClick={closeModal} className="btn_close pointer" src="/icons/ic_close.svg" />
              </div>

              <div className="content">
                <p>오늘의 웹툰을 친구들에게 공유하세요!</p>
              </div>

              <div className="modal_actions">
                <img className="pointer" onClick={handleShareFacebook} src="/icons/ic-share-facebook.svg" />
                <img className="pointer" onClick={handleShareKakao} src="/icons/ic-share-kakao.svg" />
                <img className="pointer" onClick={handleShareTwitter} src="/icons/ic-share-twitter.svg" />
                <img className="pointer" onClick={handleShareUrl} src="/icons/ic-share-url.svg" />
              </div>
            </div>
          </div>
        )}

        <p className="footer-notice">
          본 사이트에 제공하는 웹툰 정보는 웹툰 서비스 제공 사이트를 토대로 업데이트 됩니다. 본 사이트는 &quot;있는 그대로&quot; 정보를 제공하고
          있으며, 사용에 대한 책임은 전적으로 사용자에게 있음을 알립니다.
        </p>

        <p className="copyright">copyright(c) 2022 All rights reserved by 오늘의 웹툰.</p>
      </div>
    </>
  );
};

export default Footer;
