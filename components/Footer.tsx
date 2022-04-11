import styled from 'styled-components';

const Footer = () => {
  const FooterWrapper = styled.div`
    width: 100%;
    // max-width: 600px;
    height: 120px;
    left: 0px;
    bottom: 34px;

    background: #262d33;

    p {
      height: 100%;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

  return (
    <>
      <FooterWrapper>
        <p>Footer</p>
      </FooterWrapper>
    </>
  );
};

export default Footer;
