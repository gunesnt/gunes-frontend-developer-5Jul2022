import AvatarButton from 'components/AvatarButton'

const AvatarUploadButton = ({ id, src, width, height, onChange }) => (
  <label htmlFor={id}>
    <input
      id={id}
      type="file"
      accept="image/*"
      onChange={onChange}
      style={{ display: 'none' }}
    />
    <AvatarButton src={src} width={width} height={height} edit />
  </label>
)

export default AvatarUploadButton
