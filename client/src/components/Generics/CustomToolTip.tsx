import { Tooltip, TooltipProps, Box } from '@mui/material';

interface CustomTooltipProps extends TooltipProps {
  name: string;
  realm: string;
  charClass: string;
  spec: string;
  faction: string;
  backgroundImageUrl: string; 
}

const CustomTooltip = ({
  name,
  realm,
  charClass,
  spec,
  faction,
  backgroundImageUrl,
  children,
  ...props
}: CustomTooltipProps) => {

  return (
		<Tooltip
			{...props}
			enterDelay={500}
			leaveDelay={200}
			title={
				<Box
					sx={{
						backgroundImage: `url(${backgroundImageUrl})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center', 
						color: 'white',
						borderRadius: '8px',
						padding: '20px',
						fontSize: '20px',
						display: 'flex',
						flexDirection: 'column',
						maxWidth: '800px',
						position: 'relative',
						minWidth: '200px', 
						minHeight: '150px', 
						backgroundRepeat: 'no-repeat', 
						'&::before': {
							content: '""',
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
						},
					}}
				>
					<span>{name} - {realm}</span>
					<span>{faction.charAt(0).toUpperCase() + faction.slice(1)} {charClass} {spec}</span>
				</Box>
			}
		>
			{children}
		</Tooltip>
  );
};

export default CustomTooltip;
