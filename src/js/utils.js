import omit from 'lodash/omit';

export const sanitiseProps = (props, discards = []) => omit(props, discards);