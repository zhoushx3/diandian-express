//账号
/*
	users:
		_id: ObjectID,
		username: string,					//4-20个字符，只支持英文大小写字母、数字、下划线、连字符(-)
		email: {address: email, verified: true/false},
		createdAt: Date,
		source: string, 					//register/qq/weibo/weixin
		role: string,						//admin/manager/user
		profile: {
			nickname: string,				//2-30个字符，允许中文
			gender: string, 				//'male'/'female'
			birthday: string,
			job: string,
			phone: string,
			QQ: string,
			weibo: string,
			photo: path,	//头像
			about: string,
			isPublic: {
				birthday: true/false,
				job: true/false,
				phone: true/false,
				QQ: true/false,
				weibo:  true/false
			}
		},
		password: {
			identity: string,
			salt: string
		}，
		services: {
			weibo: {
		
			},
			QQ: {
		
			},
			weixin: {
		
			}
		}
*/