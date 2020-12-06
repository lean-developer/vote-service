# createMaster
POST http://localhost:3200/master?name=test1

# createMemberOfMaster
POST http://localhost:3200/member/master/1?name=member2

# getMember
GET http://localhost:3200/member/1

# getMaster (incl. Members)
GET http://localhost:3200/master/1

# getMemberVotes
GET http://localhost:3200/member/1/votes

# saveMemberVote
POST http://localhost:3200/member/1/vote/1

Body:
{
	"points": 13,
	"notiz": "Eine Notiz ..."
}

# getVote
GET http://localhost:3200/vote/1 

Result:
{
	"id": 1,
	"name": "aaa",
	"status": "",
	"points": "",
	"created": "2020-12-05T00:20:11.000Z",
	"modified": "0000-00-00 00:00:00"
}