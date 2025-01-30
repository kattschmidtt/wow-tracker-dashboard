import { useEffect, useState } from "react";
import { GuildMemberModel } from "../../Models/guildModel";
import { Link } from "@mui/material";
import CustomTooltip from "../Generics/CustomToolTip";

const Members = () => {
  const [members, setMembers] = useState<GuildMemberModel[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //map name colorZ based on class name
  const classColorMapping: { [key: string]: string } = {
    "Death Knight": "#C41E3A",
    "Demon Hunter": "#A330C9",
    Druid: "#FF7C0A",
    Evoker: "#33937F",
    Hunter: "#AAD372",
    Mage: "#3FC7EB",
    Monk: "#00FF98",
    Paladin: "#F48CBA",
    Priest: "#FFFFFF",
    Rogue: "#FFF468",
    Shaman: "#0070DD",
    Warlock: "#8788EE",
    Warrior: "#C69B6D",
  };

  //map tooltip background based on api response
  const bannerMapping: { [key: string]: string } = {
    hordebanner1: "/horde-logo-banner.png",
    alliancebanner1: "/alliance-logo-banner.png",
  };

  useEffect(() => {
    fetch("http://localhost:8080/guildMembers")
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was no bueno");
        }
        return resp.json();
      })
      .then((data: GuildMemberModel[]) => {
        setMembers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, []);

  if (isLoading) {
    return <div style={{ color: "#fff" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "#fff" }}>Error: {error}</div>;
  }

  return (
    <div
      style={{
        paddingBottom: "2rem",
        paddingRight: "5rem",
        paddingLeft: "5rem",
      }}
    >
      <h4 style={{ color: "#fff" }}>Members</h4>
      {members &&
        members.map((member, idx) => {
          const className = member.character.class;
          const classColor = classColorMapping[className] || "#FFFFFF";
          const profileBanner = member.character.profile_banner;
          const banner = bannerMapping[profileBanner] || "";

          return (
            <CustomTooltip
              name={member.character.name}
              realm={member.character.realm}
              charClass={member.character.class}
              spec={member.character.active_spec_name}
              faction={member.character.faction}
              backgroundImageUrl={banner}
              key={idx}
            >
              <span style={{ color: classColor, marginRight: "2px" }}>
                <Link
                  color="inherit"
                  href={member.character.profile_url}
                  underline="hover"
                >
                  {member.character.name} &nbsp;
                </Link>
              </span>
            </CustomTooltip>
          );
        })}
      <span style={{ color: "white" }}>
        <Link
          color="inherit"
          href="https://raider.io/guilds/us/proudmoore/Acrimonious"
          underline="hover"
        >
          ...
        </Link>
      </span>
    </div>
  );
};

export default Members;
