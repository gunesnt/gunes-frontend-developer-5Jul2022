import { useEffect, Fragment } from 'react'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone'

import { useModal } from 'utils/hooks'
import { useExperience } from 'contexts/experience'
import Section from 'components/Section'
import ExperienceItem from 'components/ExperienceItem'
import EditExperienceModal from 'components/modals/EditExperienceModal'
import NoDataPlaceholder from 'components/NoDataPlaceholder'

const ExperienceList = () => {
  const { experiences, fetchExps } = useExperience()
  const [modalOpen, handleModalOpen, handleModalClose] = useModal()

  useEffect(() => {
    fetchExps()
  }, [])

  return (
    <Section
      title="Work Experiences"
      action={
        <>
          <IconButton onClick={handleModalOpen}>
            <AddIcon />
          </IconButton>
          {modalOpen && (
            <EditExperienceModal
              open={modalOpen}
              handleClose={handleModalClose}
            />
          )}
        </>
      }>
      {!experiences || !experiences.length ? (
        <NoDataPlaceholder
          IconComp={BusinessTwoToneIcon}
          message="Haven't added any experience yet."
        />
      ) : (
        <List sx={{ '&, > .MuiListItem-root:last-child': { pb: 0 } }}>
          {experiences.map((item, index) => (
            <Fragment key={item.id}>
              <ExperienceItem item={item} />
              {index < experiences.length - 1 && <Divider component="li" />}
            </Fragment>
          ))}
        </List>
      )}
    </Section>
  )
}

export default ExperienceList
