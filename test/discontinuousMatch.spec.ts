import expect from 'expect.js';
import { discontinuousMatch } from '../src/index';
import { getMatchedString } from './helper';

describe('discontinuousMatch', () => {
  it('Ignore case', () => {
    const strs = [
      '18fe52nbst3ev2zgs2mlytphaqmgknennriaiq11r',
      'r8poojlusvpopw1N8bkl48r81vnelhdaqust2rn4O6pc8n2ven60wjcr',
      'vj6iyxmtmo7u5z7bwpcgd8h7yrllro4aixng4zirayh2hnhz6oglr06b',
      'a4f42cjspgx5032djbdiaojcxl5kjrq62sbicrod7pwvj6iyxmt',
    ];
    const matching = '881vne2rn4o';
    const res = discontinuousMatch(strs, matching);
    expect(res.length).to.equal(1);
    expect(res[0].index).to.equal(1);
    expect(getMatchedString(res[0]).toLowerCase()).to.equal(matching.toLowerCase());
  });
  
  it('Don\'t ignore case', () => {
    const strs = [
      '18fe52nbst3ev2zgs2mlytphaqmgknennriaiq11r',
      'r8poojlusvpopw1N8bkl48r81vnelhdaqust2rn4O6pc8n2ven60wjcr',
      'vj6iyxmtmo7u5z7bwpcgd8h7yrllro4aixng4zirayh2hnhz6oglr06b',
      'a4f42cjspgx5032djbdiaojcxl5kjrq62sbicrod7pwvj6iyxmt',
    ];
    const matching = '881vne2rn4o';
    const res = discontinuousMatch(strs, matching, false);
    expect(res.length).to.equal(0);
  });

  it('Match with repeat times', () => {
    const strs = [
      '18fe52nbst3ev2zgs2mlytphaqmgknennriaiq11r',
      'r8poojlusvpopw1N8bkl48r81vnelhdaqust2rn4O6pc8n2ven60wjcr',
      'vj6iyxmtmo7u5z7bwpcgd8h7yrllro4aixng4zirayh2hnhz6oglr06b',
      'a4f42cjspgx5032djbdiaojcxl5kjrq62sbicrod7pwvj6iyxmt',
    ];
    let matching = '881vne2rn4o';
    let res = discontinuousMatch(strs, matching);
    expect(res.length).to.equal(1);
    matching += 'nwj';
    res = discontinuousMatch(res, matching);
    expect(res.length).to.equal(1);
    expect(getMatchedString(res[0]).toLowerCase()).to.equal(matching.toLowerCase());
  });
});