const Preloader = () => {
  return (
    <svg
      className="preloader"
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      version="1"
      viewBox="0 0 128 128"
    >
      <path
        fill="#f9b92f"
        d="M111.708 49A50.116 50.116 0 0079 16.292V1.785A64.076 64.076 0 01126.215 49h-14.507zM49 16.292A50.114 50.114 0 0016.292 49H1.785A64.075 64.075 0 0149 1.785v14.507zM16.292 79A50.116 50.116 0 0049 111.708v14.507A64.076 64.076 0 011.785 79h14.507zM79 111.708A50.118 50.118 0 00111.708 79h14.507A64.078 64.078 0 0179 126.215v-14.507z"
      >
        <animateTransform
          attributeName="transform"
          dur="800ms"
          from="0 64 64"
          repeatCount="indefinite"
          to="-90 64 64"
          type="rotate"
        ></animateTransform>
      </path>
      <path
        fill="#f9b92f"
        d="M96.971 53.633a34.634 34.634 0 00-22.6-22.6V21A44.283 44.283 0 01107 53.633H96.971zm-43.338-22.6a34.634 34.634 0 00-22.6 22.6H21A44.283 44.283 0 0153.633 21v10.029zm-22.6 43.338a34.634 34.634 0 0022.6 22.6V107A44.283 44.283 0 0121 74.367h10.029zm43.338 22.6a34.634 34.634 0 0022.6-22.6H107A44.283 44.283 0 0174.367 107V96.971z"
      >
        <animateTransform
          attributeName="transform"
          dur="800ms"
          from="0 64 64"
          repeatCount="indefinite"
          to="90 64 64"
          type="rotate"
        ></animateTransform>
      </path>
      <path
        fill="#f9b92f"
        d="M85.47 57.25a22.552 22.552 0 00-14.72-14.72V36A28.836 28.836 0 0192 57.25h-6.53zM57.25 42.53a22.552 22.552 0 00-14.72 14.72H36A28.836 28.836 0 0157.25 36v6.53zM42.53 70.75a22.552 22.552 0 0014.72 14.72V92A28.836 28.836 0 0136 70.75h6.53zm28.22 14.72a22.552 22.552 0 0014.72-14.72H92A28.836 28.836 0 0170.75 92v-6.53z"
      >
        <animateTransform
          attributeName="transform"
          dur="800ms"
          from="0 64 64"
          repeatCount="indefinite"
          to="-90 64 64"
          type="rotate"
        ></animateTransform>
      </path>
    </svg>
  );
};

export default Preloader;
