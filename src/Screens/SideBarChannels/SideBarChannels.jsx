import React from "react";
import { Link } from "react-router-dom";

const SidebarChannels = ({ channels, onDeleteChannel }) => {
  return (
    <aside>
      <nav>
        <ul>
          {channels.length > 0 ? (
            channels.map((channel) => {
              return (
                <li key={channel._id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Link to={`/workspaces/${channel.workspace_id}/channels/${channel._id}`}>
                    {channel.name}
                  </Link>
                  <button
                    onClick={() => onDeleteChannel(channel._id)}
                    style={{ color: 'red', border: 'none', background: 'transparent', cursor: 'pointer' }}
                    title="Eliminar canal"
                  >
                    🗑️
                  </button>
                </li>
              );
            })
          ) : (
            <p>No hay canales</p>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarChannels;
