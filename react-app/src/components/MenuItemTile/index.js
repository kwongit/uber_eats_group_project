import { useHistory } from "react-router";
import OpenModalButton from "../OpenModalButton";
import { DeleteMenuItemModal } from "./DeleteMenuItemModal";
import { useSelector } from "react-redux";
import "./MenuItemTile.css"

const MenuItemTile = ({ menuItem, restaurantId }) => {
  const { id, name, price, calories, imageUrl } = menuItem;
  const history = useHistory();

  const handleClick = () => {
    // tbd
    history.push(`/menuitems/${id}`);
  };

  const restaurant = useSelector((state) => state.restaurant.singleRestaurant);

  const currentUser = useSelector((state) => state.session.user);

  return (
    <div className="menu-item-tile-container" key={id} onClick={handleClick}>
      <img
        className="menu-item-tile-image"
        src={imageUrl}
        alt={name}
        title={name}
      ></img>
      <div className="menu-item-tile-info">
        <div className="menu-item-tile-info-left-col">
          <div className="menu-item-small-name">{name}</div>
          <div className="menu-item-small-info">${price}
          {calories &&
            <>
              <span>&#183;</span> <span style={{color:"grey"}}>{calories} Cal.</span>
            </>}
          </div>
        </div>
        <div className="menu-item-tile-info-right-col">
          {restaurant.owner_id === currentUser.id && (
            <OpenModalButton
              buttonText="Delete"
              modalComponent={<DeleteMenuItemModal menuItemId={menuItem.id} />}
            />
          )}
        </div>
      </div>

    </div>
  );
};

export default MenuItemTile;
