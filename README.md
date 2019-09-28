<!-- PROJECT SHIELDS -->

[![Build Status][build-shield]]()
[![MIT License][license-shield]][license-url]
[![Contributors][contributors-shield]]()
<img src="https://img.badgesize.io/paramsinghvc/redux-operation/master/dist/index.js?compression=gzip&label=gzip+size&max=3000&softmax=2000">
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/paramsinghvc/redux-operation">
    <img src="https://user-images.githubusercontent.com/4329912/57995433-a1103380-7adf-11e9-9001-d76b38ec6dea.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Create Redux Operation</h3>

  <p align="center">
    A utility to simplify creation of redux operations like loading, success, failure automatically
    <br />
    <a href="https://www.npmjs.com/package/@mollycule/redux-operation"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://codesandbox.io/s/redux-operation-example-pptq2?fontsize=14">View Demo</a>
    ·
    <a href="https://github.com/paramsinghvc/redux-operation/issues">Report Bug</a>
    ·
    <a href="https://github.com/paramsinghvc/redux-operation/issues">Request Feature</a>
    .
    <a href="https://www.npmjs.com/package/@mollycule/redux-operation">NPM Link</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project

A utility to simplify creation of redux operations like loading, success, failure automatically.

### Built With

- [TypeScript](https://www.typescriptlang.org/)
- [ParcelJS](https://parceljs.org/)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Redux

### Installation

```sh
npm i @mollycule/redux-operation -S
```

<!-- USAGE EXAMPLES -->

## Usage

1. Wrap the root app component with `redux-hook` provider by calling `createStoreContext<IRootState>` while specifying the shape of Redux App RootState into Generic Parameter.

```ts
import createReduxOperation, {
  actionFlags,
  augmentReducer,
  IReduxOperations,
  IAction
} from "@mollycule/redux-operation";

const {
  actions: [authRequest, authSuccess, authFailure],
  constants: authConstants,
  reducer: authenticationReducer
} = createReduxOperation("AUTHENTICATE");

export { authSuccess, authRequest, authFailure };

export interface ILoginState {
  metaProp: string;
}

const initialState = {
  metaProp: ""
};

const loginReducer = (
  state = initialState,
  action: IAction<symbol | string, any>
) => {
  switch (action.type) {
    case authConstants.get(actionFlags.REQUEST):
      return {
        ...state,
        metaProp: "SET NOW"
      };
    default:
      return state;
  }
};

export interface ILoginStateAugmented extends ILoginState {
  auth: IReduxOperations;
}

export default augmentReducer(loginReducer)({
  auth: authenticationReducer
});
```

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Param Singh - [@paramsinghvc](https://github.com/paramsinghvc) - paramsinghvc@gmail.com

Project Link: [https://github.com/paramsinghvc/redux-operation](https://github.com/paramsinghvc/redux-operation)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Img Shields](https://shields.io)

<!-- MARKDOWN LINKS & IMAGES -->

[build-shield]: https://img.shields.io/badge/build-passing-brightgreen.svg?style=flat
[contributors-shield]: https://img.shields.io/badge/contributors-1-orange.svg?style=flat
[license-shield]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://choosealicense.com/licenses/mit
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat&logo=linkedin&colorB=0077B5
[linkedin-url]: https://www.linkedin.com/in/paramsinghvc
[product-screenshot]: https://user-images.githubusercontent.com/4329912/57970750-b895d200-79a2-11e9-9fdf-fcf80c8fce28.png
