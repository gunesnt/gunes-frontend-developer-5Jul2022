import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'

import { formatDate } from 'utils/date'
import CompanyAvatar from 'components/CompanyAvatar'
import ExperienceItemMenu from 'components/ExperienceItemMenu'

const ExperienceItem = ({ item }) => (
  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
    <ListItemAvatar>
      <CompanyAvatar
        src={item.company?.logo}
        alt={item.company?.name || ''}
        large
      />
    </ListItemAvatar>

    <ListItemText
      primary={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography>{item.jobTitle}</Typography>

          <ExperienceItemMenu item={item} />
        </Box>
      }
      secondary={
        <>
          <Typography variant="caption" display="block">
            {!item.company.domain ? (
              item.company.name
            ) : (
              <Link
                href={`https://${item.company.domain}`}
                target="_blank"
                color="inherit"
                title={item.company.name}>
                {item.company.name}
              </Link>
            )}
            {' — '}
            {formatDate(item.startDate.toDate())}
            {' - '}
            {item.isCurrent ? 'Present' : formatDate(item.endDate.toDate())}
          </Typography>

          <Typography
            variant="caption"
            color="text.primary"
            sx={{ whiteSpace: 'pre-line' }}>
            {item.description}
          </Typography>
        </>
      }
    />
  </ListItem>
)

export default ExperienceItem
