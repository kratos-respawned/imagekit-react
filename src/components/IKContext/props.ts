import ImageKit from 'imagekit-javascript';
import PropTypes, { InferProps } from 'prop-types';

const Props = {
  publicKey: PropTypes.string,
  urlEndpoint: PropTypes.string,
  authenticator: PropTypes.func
};

export const IKContextCombinedProps = {
  ...Props,
  transformationPosition: PropTypes.oneOf(['path', 'query']),
  ikClient: PropTypes.instanceOf(ImageKit),
};

export type IKContextCombinedProps = InferProps<typeof IKContextCombinedProps> & {
  urlEndpoint?: string;
};

export type IKContextBaseProps = InferProps<typeof Props>;

export default Props;