import cloudinary from 'cloudinary-core'

const getCloudinary = function(cloudname) {
  return cloudinary.Cloudinary.new({ cloud_name: cloudname })
}

function doubleEncode(str) {
  // console.log("double encode");
  if (!str) return ''
  let arr = str.split('')
  let newArr = []
  for (let c of arr) {
    newArr.push(encodeURIComponent(encodeURIComponent(c)))
  }
  let newStr = newArr.join('')
  return newStr
}

// convert hex to dec
const hexdec = function(hex) {
  return hex
    .toLowerCase()
    .split('')
    .reduce((result, ch) => result * 16 + '0123456789abcdefgh'.indexOf(ch), 0)
}

// luminosity algorithm
const getContrastL = function(hexcolor) {
  let r = hexdec(hexcolor.substr(0, 2))
  let g = hexdec(hexcolor.substr(2, 2))
  let b = hexdec(hexcolor.substr(4, 2))
  let l = r * 0.2126 + g * 0.7152 + b * 0.0722
  return l >= 128 ? '000000' : 'ffffff'
}

const ListAPIData = {
  processSingleStudent(student, cloudname) {
    const studentData = {}
    studentData.publicId = student.public_id || ''
    studentData.fullname = `${doubleEncode(
      student.context.custom.fname || ''
    )}%20${doubleEncode(student.context.custom.lname || '')}`
    studentData.org = doubleEncode(student.context.custom.org || '')
    studentData.title = doubleEncode(student.context.custom.title || '')
    let bgcolor =
      student.context.custom.bgcolor.length > 0
        ? student.context.custom.bgcolor
        : '231F20' //default is darkest
    studentData.bgcolor = `!rgb:${bgcolor}!`
    studentData.color = `!rgb:${getContrastL(bgcolor)}!`
    let filler = Array(45)
      .fill('%20')
      .join('')
    //create overlay text
    const overlayText = `!${studentData.fullname}%250A${studentData.title}%250A${studentData.org}%250A${filler}!`
    //create badge URL
    const cld = getCloudinary(cloudname)
    studentData.URL = cld.url(
      studentData.publicId,
      cld
        .transformation()
        .variables([
          ['$data', `${overlayText}`],
          ['$color', `${studentData.color}`],
          ['$bgcolor', `${studentData.bgcolor}`]
        ])
        .transformation('v-badge-color')
    )
    return studentData
  }
}

export default ListAPIData
