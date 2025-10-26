import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Grid } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { sanitizeDate } from "../../tools/tools";
import { useAuth } from "../../context/AuthContext";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const apiURL = import.meta.env.VITE_BASE_URL ?? "/api";

function normalizePath(path) {
  return path.replace(/\\/g, "/");
}

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export const Item = ({ item, handleOpenModify, handleOpenDelete }) => {
  const normalizedPath = normalizePath(item.image);
  const imageUrl = `${apiURL.replace(/\/$/, "")}/${normalizedPath}`;
  const { user } = useAuth();

  const canModify = user && user.role !== "VOLUNTARIO";

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "white" }} aria-label="recipe">
            <img src="/src/assets/icons/itemIcon.png" />
          </Avatar>
        }
        title={item.product}
        subheader={item.provider}
      />
      <CardMedia component="img" image={imageUrl} alt="item" />
      <CardContent>
        <Grid container spacing={{ md: 2 }} justifyContent={"space-between"}>
          <Grid item spacing={{ md: 6 }}>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Cantidad: {item.quantity}
            </Typography>
          </Grid>
          <Grid item spacing={{ md: 6 }}>
            {" "}
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Estado: {item.state}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={{ md: 2 }} justifyContent={"space-between"}>
          <Grid item spacing={{ md: 6 }}>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Precio: {item.price}
            </Typography>
          </Grid>
          <Grid item spacing={{ md: 6 }}>
            {" "}
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Origen: {item.origin}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {canModify && (
          <>
            <IconButton
              onClick={() => handleOpenModify(item)}
              aria-label="add to favorites"
            >
              <MdModeEditOutline />
            </IconButton>
            <IconButton
              onClick={() => handleOpenDelete(item)}
              aria-label="share"
            >
              <MdDelete />
            </IconButton>
          </>
        )}

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ display: "flex", flexWrap: "wrap" }}>
          <Typography sx={{ marginBottom: 2 }}>
            Descripcion: {item.description}
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Categoria: {item.category}
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Fecha adquisicion: {sanitizeDate(item.acquisition_date)}
          </Typography>
          <Typography>
            Fecha Modificacion: {sanitizeDate(item.updatedAt)}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
