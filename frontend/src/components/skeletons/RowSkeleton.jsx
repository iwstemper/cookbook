import React from 'react'
import ContentLoader from 'react-content-loader'

const RowSkeleton = (props) => (
  <ContentLoader
    width={props.width || '100%'}
    height={props.height || '100%'}
    viewBox="0 0 100% 100%"
    backgroundColor="#f5f5f5"
    foregroundColor="#dbdbdb"
    {...props}
  >
    <rect x="5%" y="12" rx="6" ry="6" width="90%" height="100%" />
  </ContentLoader>
)

export default RowSkeleton