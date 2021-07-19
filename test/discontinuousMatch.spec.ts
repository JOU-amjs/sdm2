import expect from 'expect.js';
import { discontinuousMatch, replaceMatchedString } from '../src/index';
import { getMatchedString } from './helper';

describe('discontinuousMatch', () => {
  it('Ignore case', () => {
    const strs = [
      '18fe52nbst3ev2zgs2mlytphaqmgknennriaiq11r',
      'r8poojlusvpopw1N8bkl48r81vnelhdaqust2rn4O6pc8n2ven60wjcr',
      'vj6iyxmtmo7u5z7bwpcgd8h7yrllro4aixng4zirayh2hnhz6oglr06b',
      'a4f42cjspgx5032djbdiaojcxl5kjrq62sbicrod7pwvj6iyxmt',
    ];
    const matching = '881vne2Rn4o';
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
    const matching = '881vne2Rn4o';
    const res = discontinuousMatch(strs, matching, false);
    expect(res.length).to.equal(0);
  });

  it('Match with deep objects', () => {
    const strs = [
      { name: '18fe52nbst3ev2zgs2mlytphaqmgknennriaiq11r' },
      { name: 'r8poojlusvpopw1N8bkl48r81vnelhdaqust2rn4O6pc8n2ven60wjcr' },
      { name: 'vj6iyxmtmo7u5z7bwpcgd8h7yrllro4aixng4zirayh2hnhz6oglr06b' },
      { name: 'a4f42cjspgx5032djbdiaojcxl5kjrq62sbicrod7pwvj6iyxmt' },
    ];
    let matching = '881vne2rn4o';
    let res = discontinuousMatch(strs, matching, true, '');
    expect(res.length).to.equal(0);
    res = discontinuousMatch(strs, matching, true, 'name');
    expect(res.length).to.equal(1);
    expect(getMatchedString(res[0]).toLowerCase()).to.equal(matching.toLowerCase());

    const strs2 = [
      { data: { name: '18fe52nbst3ev2zgs2mlytphaqmgknennriaiq11r' } },
      { data: { name: 'r8poojlusvpopw1N8bkl48r81vnelhdaqust2rn4O6pc8n2ven60wjcr' } },
      { data: { name: 'vj6iyxmtmo7u5z7bwpcgd8h7yrllro4aixng4zirayh2hnhz6oglr06b' } },
      { data: { name: 'a4f42cjspgx5032djbdiaojcxl5kjrq62sbicrod7pwvj6iyxmt' } },
    ];
    res = discontinuousMatch(strs2, matching, true, 'data.name');
    expect(res.length).to.equal(1);
    expect(getMatchedString(res[0]).toLowerCase()).to.equal(matching.toLowerCase());
  });

  it('Error matches', () => {
    const strs = [
      '18fe52nbst3ev2zgs2mlytphaqmgknennriaiq11r',
      'r8poojlusvpopw1N8bkl48r81vnelhdaqust2rn4O6pc8n2ven60wjcr',
      'vj6iyxmtmo7u5z7bwpcgd8h7yrllro4aixng4zirayh2hnhz6oglr06b',
      'a4f42cjspgx5032djbdiaojcxl5kjrq62sbicrod7pwvj6iyxmt',
    ];
    const matching = '881vne2Rn4o';
    let res = discontinuousMatch([], matching);
    expect(res.length).to.equal(0);
    res = discontinuousMatch(strs, '');
    expect(res.length).to.equal(0);
  });

  it('Replace matched string', () => {
    const strs = [
      '18fe52nbst3ev2zgs2mlytphaqmgknennriaiq11r',
      'r8poojlusvpopw1N8bkl48r81vnelhdaqust2rn4O6pc8n2ven60wjcr',
      'vj6iyxmtmo7u5z7bwpcgd8h7yrllro4aixng4zirayh2hnhz6oglr06b',
      'a4f42cjspgx5032djbdiaojcxl5kjrq62sbicrod7pwvj6iyxmt',
    ];
    const matching = '881vne2Rn4o';
    const res = discontinuousMatch(strs, matching);
    expect(res.length).to.equal(1);
    let replacedStr = replaceMatchedString(res[0], (val) => `|${val}|`);
    expect(replacedStr).to.equal('r|8|poojlusvpopw1N|8|bkl48r8|1vne|lhdaqust|2rn4O|6pc8n2ven60wjcr');
  });
});