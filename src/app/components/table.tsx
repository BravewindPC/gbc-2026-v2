import { GroupData, Organization } from '@/lib/type';
import React from 'react';

interface TableProps {
  type: string;
  data: GroupData;
}

const Table: React.FC<TableProps> = ({ type, data }) => {

  return (
    <div className="overflow-x-auto rounded-lg border border-tourOrange/25">
      <table className="min-w-[280px] w-[700px] md:w-[1000px] max-w-[1660px] mx-auto text-xs md:text-sm text-tourOrange">
        <thead>
          <tr className="bg-tourOrange text-left text-tourDarkGreen">
            <th className="p-2">No</th>
            <th className="p-2 w-20 md:w-48">Name</th>
            <th className="p-2">HMJ/TPB</th>
            <th className="p-2">Played</th>
            <th className="p-2">Win-Lose</th>
            <th className="p-2">Set Win-Lose</th>
            <th className="p-2">Score Gain-Lose</th>
            <th className="p-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {data?.members
          .filter(team => team.matchResult !== null)
          .slice() 
          .sort((a, b) => {
            if (b.matchResult.points !== a.matchResult.points) {
              return b.matchResult.points - a.matchResult.points;
            } else {
              const setDiffA = a.matchResult.setWin - a.matchResult.setLose;
              const setDiffB = b.matchResult.setWin - b.matchResult.setLose;
              if (setDiffA !== setDiffB) {
                return setDiffB - setDiffA;
              } else {
                const scoreDiffA = a.matchResult.scoreGain - a.matchResult.scoreLose;
                const scoreDiffB = b.matchResult.scoreGain - b.matchResult.scoreLose;
                if (scoreDiffA !== scoreDiffB) {
                  return scoreDiffB - scoreDiffA;
                } else {
                  return b.matchResult.setWin - a.matchResult.setWin;
                }
              }
            }
          })
          .map((member, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-[#1A5150]' : 'bg-[#1f5a58]'} font-monserrat font-bold border-b border-tourOrange/10`}>
              <td className="p-2">{index+1}</td>
              <td className="p-2">
                <div className="w-[200px] max-w-full overflow-auto hide-scrollbar whitespace-nowrap">
                  {member.name}
                </div>
              </td>
              <td className="p-2">{Organization[member.organization as keyof typeof Organization] ?? member.organization ?? "-"}</td>
              <td className="p-2">{member.matchResult.played}</td>
              <td className="p-2">{`${member.matchResult.win}-${member.matchResult.lose}`}</td>
              <td className="p-2">{`${member.matchResult.setWin}-${member.matchResult.setLose}`}</td>
              <td className="p-2">{`${member.matchResult.scoreGain}-${member.matchResult.scoreLose}`}</td>
              <td className="p-2">{member.matchResult.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
