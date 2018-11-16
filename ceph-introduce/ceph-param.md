# ceph

## ceph mgr restful

```json
  {
    "/": {
        "GET": [
            "Show the basic information for the REST API",
            "This includes values like api version or auth method"
        ]
    },
    "/config/cluster": {
        "GET": [
            "Show all cluster configuration options"
        ]
    },
    "/config/cluster/<arg>": {
        "GET": [
            "Show specific configuration option"
        ]
    },
    "/config/osd": {
        "GET": [
            "Show OSD configuration options"
        ],
        "PATCH": [
            "Modify OSD configration options"
        ]
    },
    "/crush/rule": {
        "GET": [
            "Show crush rules"
        ]
    },
    "/doc": {
        "GET": [
            "Show documentation information"
        ]
    },
    "/mon": {
        "GET": [
            "Show the information for all the monitors"
        ]
    },
    "/mon/<arg>": {
        "GET": [
            "Show the information for the monitor name"
        ]
    },
    "/osd": {
        "GET": [
            "Show the information for all the OSDs"
        ]
    },
    "/osd/<arg>": {
        "GET": [
            "Show the information for the OSD id"
        ],
        "PATCH": [
            "Modify the state (up, in) of the OSD id or reweight it"
        ]
    },
    "/osd/<arg>/command": {
        "GET": [
            "Show implemented commands for the OSD id"
        ],
        "POST": [
            "Run the implemented command for the OSD id"
        ]
    },
    "/pool": {
        "GET": [
            "Show the information for all the pools"
        ],
        "POST": [
            "Create a new pool",
            "Requires name and pg_num dict arguments"
        ]
    },
    "/pool/<arg>": {
        "DELETE": [
            "Remove the pool data for the pool id"
        ],
        "GET": [
            "Show the information for the pool id"
        ],
        "PATCH": [
            "Modify the information for the pool id"
        ]
    },
    "/request": {
        "DELETE": [
            "Remove all the finished requests"
        ],
        "GET": [
            "List all the available requests"
        ],
        "POST": [
            "Pass through method to create any request"
        ]
    },
    "/request/<arg>": {
        "DELETE": [
            "Remove the request id from the database"
        ],
        "GET": [
            "Show the information for the request id"
        ]
    },
    "/server": {
        "GET": [
            "Show the information for all the servers"
        ]
    },
    "/server/<arg>": {
        "GET": [
            "Show the information for the server fqdn"
        ]
    }

```