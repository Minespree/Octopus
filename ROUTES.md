# Player routes

`GET /players/:uuid` - Retrieve data about this player. Contains stats of all the games.

**RESTRICTED** `POST /players/:uuid` - Update fields of a player

`GET /players/status/:uuid` - Retrieve data about an online player such as the server where he's playing on. Partially restricted, staff and youtuber won't return the server ID. `online: false` will be returned if the player is vanished (only if the API key holder isn't a staff member).

## Game routes

`GET /games/` - Gets a list of all the Minespree games.

`GET /games/<GAME_ID>` - Gets metadata about a game.

## Babel routes

**RESTRICTED** `POST /babel/<lang>/` - Adds/modifies a message to this language. Request data format:

```json
{
  id: "messageId",
  value: "This is a message"
}
```

`value` can also be an array of strings.

## Punishment routes

**RESTRICTED** `GET /punishments/` - Gets the active punishments of a player. Request data format:

```json
{
  player: "uuid-with-dashes"
}
```

**RESTRICTED** `POST /punishments/` - Create a punishment entry. Request data format:

```javascript
{
  target: "uuid-with-dashes",
  source: "uuid-with-dashes",
  type: "TEMP_BAN" || "KICK" || "BAN" || "MUTE" || "TEMP_MUTE",
  // Only for "TEMP_BAN" and "TEMP_MUTE"
  until: 1505789302212, // epoch timestamp
  reason: "Hijacked account" // Optional
}
```

This endpoint will generate a punishment id, appeal code and timestamp value for you.

**RESTRICTED** `GET /punishments/<ID>` - Get metadata about a punishment entry.

**RESTRICTED** `DELETE /punishments/<ID>` - Delete a punishment entry. This won't delete the entry on the database, it will only set the `undone` value to `true`. Can only be applied to `BAN`, `MUTE`, `TEMP_BAN` and `TEMP_MUTE` punishment types.

## PlayPen routes

**RESTRICTED** `GET /playpen/servers` - Gets a list of all the current instances.

**RESTRICTED** `GET /playpen/packages` - Gets a list of all the current promoted packages.

**RESTRICTED** `GET /playpen/server/<ID>` - Gets data about a server.

**RESTRICTED** `POST /playpen/server/<ID>/deprovision` - Deprovisions the server instance.

**RESTRICTED** `POST /playpen/server/<ID>/execute` - Runs a command on the server. Request data format:

```json
{
  command: "say I'm bored"
}
```

## GitLab routes

**RESTRICTED** `GET /gitlab/ci/<PROJECT_ID>` - Gets a list of all the current running jobs for a project.

**RESTRICTED** `GET /gitlab/ci/<PROJECT_ID>/<JOB_ID>` - Gets the status of the job.

**RESTRICTED** `POST /gitlab/ci/<PROJECT_ID>/<JOB_ID>/stop` - Stops the job task. GitLab doesn't guarantee completion.

## Dedis routes

User refers to a developer with SSH access to the machines.

**RESTRICTED** `GET /dedis/online` - Gets a list of all the online dedicated servers.

**RESTRICTED** `POST /dedis/` - Adds a machine. Request data format:

```javascript
{
  id: "unique-dedi-id",
  ip: "127.0.0.1",
  addUsers: true // Will add all the current developers to the machine
}
```

**RESTRICTED** `GET /dedis/<ID>` - Gets a list of all the SSH users on this machine.

**RESTRICTED** `POST /dedis/user` - Creates a new SSH user. Request data format:

```json
{
  username: "egg",
  password: "1337",
  sshKey: "raw ssh public key"
}
```

**RESTRICTED** `DELETE /dedis/user/<USERNAME>` - Deletes a SSH user from all the machines.
