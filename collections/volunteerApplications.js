/*志愿者申请*/
/*
  volunteerApplications:
  	_id: ObjectId,
  	createdAt: Date,
  	createdBy: userId,
  	tags: [string,],				标签，用于筛选申请表
  	name: string,					1-20个字符
  	gender: 'female'/'male',
  	photo: path,
  	birthday: Date,
  	province: string,				1-20个字符
  	city: string,
  	politicalStatus: '团员'/'党员'/'群众',
  	workUnit: string,				1-100个字符
  	position: string,				1-50个字符
  	IDCardNo: string,				18位		/^[\d]{17}[xX\d]{1}$/
  	speciality: string,				1-100个字符
  	
  	address: string,
  	postcode: string,
  	cellphone: string,
  	phone: string,
  	email: string,
  	QQ: string,

  	languages: [string,],
  	vihicle: [string,],
  	volunteerTime: string,
  	volunteerService: [string,],
  	opinions: string
*/